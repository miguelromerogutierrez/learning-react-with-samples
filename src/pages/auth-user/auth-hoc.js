import React from 'react';

const __error = {
  msg: 'Auth user error'
};

const __user = {
  username: 'MiguelRomero',
  age: 28,
  email: 'miromero@email.com'
};

const Auth = {
  login: (username) => new Promise(
    (resolve, reject) => {
      if (username === 'mike') {
        setTimeout(() => reject(__error), 400);
      }
      else { 
        setTimeout(() => {
          Auth.user = __user;
          Auth.suscriptors.forEach(cb => cb('login', Auth.user));
          resolve(__user);
        }, 400);
      } 
    }
  ),
  logout: () => new Promise(resolve => {
    Auth.user = null;
    Auth.suscriptors.forEach(cb => cb('logout'));
    return resolve();
  }),
  user: null,
  suscriptors: [],
  suscribe: (cb) => {
    debugger;
    Auth.suscriptors.push(cb);
  }
}

export default function withAuthProvider(Component) {
  return class AuthProvider extends React.Component {

    state = {
      pending: false,
      success: false,
      error: false,
      user: null
    };

    componentDidMount() {
      Auth.suscribe((type) => {
        debugger;
        switch(type) {
          case 'login':
            this.setState({ user: Auth.user });
            break;
          case 'logout':
              this.setState({ user: null });
              break;
          default:
        }
      })
    }

    login = (username) => {
      this.setState({ pending: true, success: false, error: false });
      Auth.login(username).then(() => {
        this.setState({
          pending: false,
          success: true,
        })
      })
      .catch(() => {
        this.setState({
          pending: false,
          error: true,
        })
      });
    };

    logout = () => {
      Auth.logout()
      .then(() => {
        this.setState({
          pending: false,
          success: true,
        })
      });
    };

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          login={this.login}
          logout={this.logout}
        />
      );
    }

  };
}
