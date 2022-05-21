import {Context} from 'near-sdk-as'

// @ts-expect-error
@nearBindgen
class Verifier {
  id: u32;
  title: string;
  isDomestic: bool;

  constructor(id: u32, title: string, isDomestic: bool) {
    this.id = id;
    this.title = title;
    this.isDomestic = isDomestic;
  }
}

// @ts-expect-error
@nearBindgen
class LocalUser {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}

// @ts-expect-error
@nearBindgen
class CampaignComment {
  message: string;
  sender: string;

  constructor(message: string) {
    this.message = message;
    this.sender = Context.sender
  }
}

// @ts-expect-error
@nearBindgen
class Campaign {
  id: u32; // Increment for faster lookup or as map in Platform?
  owner: string; // TODO: should owner address be pulled from context here or in platform?
  status: u8; // 0-prerelease; 1-running; 2-paying out; 3-closed;
  domesticVerifierIds: u32[]
  internationalVerifierIds: u32[]
  category: u8; // 0-individual; 1-neighborhood; 2-city;
  title: string;
  description: string;
  fundingGoal: u32;
  currentFunding: u32;
  // NOTE: how to handle tranched payments?
  payoutStatus: u8; // 0-100 
  startDate: u64;
  endDate: u64;
  longitude: f32;
  latitude: f32;
  images: string[];
  comments: CampaignComment[];
  // NOTE: based on theoretical max of 42mil. pop. of Ukraine
  // Instead of restricting voting to once per campaign, we can save
  // space by limiting a user's overall votes but allow voting more than
  // once for a campaign.
  votes: u32; 

  constructor(
    id: u32
  ) {
    this.id = id
  }

  isVerified (): bool {
    return this.domesticVerifierIds.length >= 2
  }

  hasMetGoal (): bool {
    return this.fundingGoal <= this.currentFunding;
  }

  // createComment
}

// @ts-expect-error
@nearBindgen
class Platform {
  campaigns: Campaign[]
  verifiers: Verifier[]
  // NOTE: theoretical max users is 42 million (pop. of Ukraine). This could be a monster.
  localUsers: LocalUser[] 

  constructor () {}

  // TODO: auth
  addVerifier(verifier: Verifier): void {
    for (let i = 0; i < this.verifiers.length; i++) {
      assert(this.verifiers[i].id !== verifier.id && this.verifiers[i].title !== verifier.title, "Verifier must have unique title and id") 
    }

    this.verifiers.push(verifier)
  }

  // TODO: auth
  addCampaign(campaign: Campaign): void {
    for (let i = 0; i < this.campaigns.length; i++) {
      assert(this.campaigns[i].id !== campaign.id, 'Campaign must have a unique ID.')
    }

    this.campaigns.push(campaign)
  }

  // TODO: auth
  voteForCampaign(localUserUsername: string, campaignId: u32): void {
    for(let i = 0; i < this.localUsers.length; i++) {
      if (localUserUsername === this.localUsers[i].username) {
        for (let n = 0; n < this.campaigns.length; n++) {
          if (campaignId === this.campaigns[n].id) {
            this.campaigns[n].votes += 1;

            return
          }
        }
      }
    }
  }

  // TODO: auth
  addLocalUser(localUser: LocalUser): void {
    for (let i = 0; i < this.localUsers.length; i++) {
      assert(this.localUsers[i].username !== localUser.username, 'Local User must have a unique username.')
    }

    this.localUsers.push(localUser)
  }
}