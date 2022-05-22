import { ContentSection } from '../content-section';

export const NotificationRail = () => (
  <aside className='sticky top-0 w-full bg-neutral-800 text-white'>
    <a href='/' className='block w-full'>
      <ContentSection className='py-2'>
        <p className='text-sm'>New images from the Ukrainian front</p>
      </ContentSection>
    </a>
  </aside>
);
