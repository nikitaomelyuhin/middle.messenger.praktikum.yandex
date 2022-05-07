export type Events = {
  keyup?: (e: any) => void;
  blur?: (e: any) => void;
  focus?: (e: any) => void;
  click?: (e: any) => void;
  change?: (e: any) => void;
}

export type Field = {
  error: boolean;
  errorMessage: string;
  value: string;
  type: string;
}

export type Modal = {
  active: string;
  hasError?: boolean;
}