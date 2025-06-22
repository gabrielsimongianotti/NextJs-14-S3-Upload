export interface ButtonProps {
    title: string;
    disabled: boolean;
    icon: "next" | "download";
    path?: "/text" | "/theme" | "/budgut" | "/"
    backPath?: "/text" | "/theme" | "/budgut" | "/"
}