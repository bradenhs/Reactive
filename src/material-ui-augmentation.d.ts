declare namespace __MaterialUI {
  interface TextFieldProps {
    pattern?: string;
    inputMode?: string;
    onKeyPress?: (e: React.KeyboardEvent<{}>) => void;
    autoCapitalize?: string;
    autoComplete?: string;
    autoCorrect?: string;
    spellCheck?: string;
    step?: string;
    min?: string;
    readOnly?: boolean;
  }
}