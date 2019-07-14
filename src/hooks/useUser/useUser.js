import React from 'react'
import PropTypes from 'prop-types';
import services from './services';

function useUser({username, password}) {
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    if (user === null) {
      const fetchData = async() => {
        const userRetrieved = await services.getUser(username, password);
        setUser(userRetrieved);
      }
      fetchData();
    }
  });

  return user;
}

useUser.propTypes = {

}

export default useUser

