export type Page = {
  pageLink: string;
  view: JSX.Element;
  displayName: string;
  showInNavbar: boolean;
};

export interface DomEvent extends Event {
  target: HTMLElement;
}
