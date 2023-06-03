import { useState, useRef, useContext } from "react";
// import { useHistory } from 'react-router-dom'
import classes from "./AuthForm.module.css";
import AuthContext from "../../Store/auth-context";

const AuthForm = () => {
  //   const history = useHistory()
  const emaiInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emaiInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC__m-6lfV4OETzuEs5JW0qvas6jfwTcbs",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          header: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              // console.log(data);
              if (data.error.message) {
                alert(data.error.message);
              }
            });
          }
        })
        .then((data) => {
          console.log(data);
          if (data.idToken) {
            // console.log(data.idToken);
            authCtx.logIn(data.idToken, enteredEmail);
            // history.replace('/')
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
    //     .then((data) => {
    //       console.log(data);
    //     })
    else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC__m-6lfV4OETzuEs5JW0qvas6jfwTcbs",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          header: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          alert("Sign up successfull, login to continue");
          emaiInputRef.current.value = "";
          passwordInputRef.current.value = "";
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emaiInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {isLoading === false ? (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          ) : (
            <p>Logging in</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
