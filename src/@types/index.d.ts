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
    xs: int;
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
  UserID: string;
  name: string;
  email: string;
}

export interface IsLoggedIn {
  user: User;
  isLogged: boolean;
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

export interface FoodEaten {
  food: string;
  id: number;
}

export interface TodaysMeal {
  createdAt: string;
  food: [FoodEaten];
  meal: string;
  user: string;
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
  mealType?: string;
  foodsEaten?: [FoodEaten];
  todaysMeals?: [TodaysMeal];
}
