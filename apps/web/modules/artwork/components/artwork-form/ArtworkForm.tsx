import S from './ArtworkForm.module.css';

export type ArtworkFormData = {
  title: string;
  price: number;
  description: string;
  region: 'africa' | 'asia' | 'europe' | 'north america' | 'oceania' | 'south america';
};

export const ArtworkForm = ({
  formData,
  setFormData,
}: {
  formData: ArtworkFormData;
  setFormData: (data: ArtworkFormData) => void;
}) => {
  return (
    <form className={S.form}>
      <label className={S.field}>
        <span>title</span>
        <input
          className={S.field__input}
          type='text'
          required
          value={formData.title}
          onChange={(input) => setFormData({ ...formData, title: input.target.value })}
        />
      </label>

      <label className={S.field}>
        <span>price</span>
        <input
          className={S.field__input}
          type='number'
          value={formData.price}
          onChange={(input) => setFormData({ ...formData, price: input.target.value })}
          required
        />
      </label>

      <label className={S.field}>
        <span>description</span>
        <input
          className={S.field__input}
          type='text'
          value={formData.description}
          onChange={(input) => setFormData({ ...formData, description: input.target.value })}
          required
        />
      </label>

      <label className={S.field}>
        <span>Region</span>
        <select
          className={S.field__input}
          name='region'
          onChange={(selection) => {
            setFormData({ ...selection, region: selection.target.value });
          }}
          value={formData.region}>
          <option value='africa'>Africa</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='north america'>N. America</option>
          <option value='oceania'>Oceania</option>
          <option value='south america'>South America</option>
        </select>
      </label>
    </form>
  );
};
