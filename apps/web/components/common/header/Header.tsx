import { ContentSection } from '../content-section';
import { NotificationRail } from '../notification-rail';

export const Header = () => (
  <div className='w-full sticky top-0 z-[1000] bg-white/75 backdrop-blur-sm'>
    {/* <NotificationRail /> */}

    <ContentSection el='header' className='flex flex-row items-baseline justify-between'>
      <a href='/' className='text-2xl font-bold'>
        refound
      </a>

      <nav className='flex flex-row gap-4'>
        {[
          { label: 'create', to: '/create.html' },
          { label: 'regions', to: '/' },
          { label: 'register', to: '/register.html' },
        ].map(({ label, to }) => (
          <a href={to} key={label} className='text-sm font-bold'>
            {label}
          </a>
        ))}
      </nav>
    </ContentSection>
  </div>
);
