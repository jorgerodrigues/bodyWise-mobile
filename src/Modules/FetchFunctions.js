// TODO REMOVE THE CODE BELOW BEFORE COMMIT
export const newGetPastUpdates = async () => {
  try {
    const response = await fetch(`${URL}/updates/me`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${props.isUserLoggedIn.token}`,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
