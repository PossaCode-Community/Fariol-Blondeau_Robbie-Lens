export type GridProps = {
  length: number;
  path?: string;
  parentElement: HTMLDivElement;
};

export type FormDataProps = {
  data: {
    name: FormDataEntryValue;
    email: FormDataEntryValue;
    message: FormDataEntryValue;
  };
};
