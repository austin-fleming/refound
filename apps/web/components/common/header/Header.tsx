import { ContentSection } from '../content-section';

export const Header = () => (
  <ContentSection el='header' className='flex flex-row justify-between items-baseline'>
    <a href='/' className='font-bold text-2xl'>
      refound
    </a>

    <nav className='flex flex-row gap-4'>
      {['creators', 'regions'].map((label) => (
        <span key={label} className='font-bold'>
          {label}
        </span>
      ))}
    </nav>
  </ContentSection>
);
