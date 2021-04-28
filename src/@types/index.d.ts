export interface Theme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    success: string;
    danger: string;
    failure: string;
  };

  palette: {
    [key: string]: string;
  };
  spacing: {
    s: int;
    m: int;
    l: int;
    xl: int;
    xxl: int;
    fromTop: int;
  };
  textVariants: {
    header: {
      fontFamily: string;
      fontSize: int;
      fontWeight: string;
    };
    subHeader: {
      fontFamily: string;
      fontSize: int;
      fontWeight: any;
    };
    subHeaderLight: {
      fontFamily: string;
      fontSize: int;
    };
    body: {
      fontFamily: string;
      fontSize: int;
    };
    bodyLight: {
      fontFamily: string;
      fontSize: int;
    };
  };
  textFields: {
    singleLine: {
      fontFamily: string;
      fontSize: int;
      backgroundColor: string;
      borderWidth: int;
      borderRadius: int;
      width: int;
      height: int;
      color: string;
      marginHorizontal: int;
    };
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: int;
}

export interface IsLoggedIn {
  user: User;
  isLogged: boolean;
  token: string;
}

export interface ErrorOrSucessMessage {
  message: string | null;
  messageType: string;
}

export interface SingleUpdate {
  _id: string;
  howDoYouFeelToday: string;
  comments: string;
  createdAt: string;
  updatedAt: string;
  __v: int;
}

export interface UpdatesFetched {
  [SingleUpdate];
}

export interface StateAppProps {
  theme: Theme;
  isLoggedIn?: isLoggedIn;
  errorOrSucessMessage?: ErrorOrSucessMessage;
  singleUpdate?: string;
  journalText?: string;
  updatesFetched?: UpdatesFetched;
  updateAlreadyExists?: SingleUpdate;
  isLoading?: boolean;
  todaysDate?: string;
}
