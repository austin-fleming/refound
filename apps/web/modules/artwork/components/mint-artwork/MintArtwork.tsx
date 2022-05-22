export const MintArtwork = ({
  nftId,
  label,
  price,
}: {
  nftId: string;
  label: string;
  price?: number;
}) => (
  <button
    className='text-sm py-[0.5em] px-[1.5em] border-2 border-solid border-slate-800 flex flex-row justify-between'
    type='button'>
    <span className='font-bold'>{label}</span>
    {price && <span className='font-bold opacity-75'>{price}</span>}
  </button>
);
