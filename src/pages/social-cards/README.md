# Table of contents

- [Social Cards](#social-cards)
  - [What we can learn?](#what-we-can-learn-?)
  - [Life-cycle component](#life-cycle-component)
  - [Stateful component](#stateful-component)
  - [Functional components](#functional-components)
  - [Side Effects inside components](#side-effects-inside-components)
  - [Ternary conditions inside JSX](#ternary-conditions-inside-jsx)
  - [Loops inside JSX](#loops-inside-jsx)
  - [Dynamic properties](#dynamic-properties)
  - [Prop getters pattern](#prop-getters-pattern)

# Social cards

You can find this kind of components everywhere (blogs, twitter, pinterest, etc). This are useful to share information from social web sites like facebook or twitter.

### What we can learn?

This is a simple component, but we can find:
  - life cycle of a component
  - the use of a stateful component
  - use of functional component
  - use of side effects inside a component
  - use of ternary condition in jsx
  - map data into components in jsx
  - dynamic properties
  - prop-getters pattern

## Life-cycle component
The life-cycle of a component is well explained in React [docs](https://reactjs.org/docs/react-component.html), in the next example we can notice the use of componentDidMount which is used to handle side effects.
```javascript
class SocialCardsPage extends React.Component {

  // handle async request to get cards data
  async componentDidMount() {
    const cardsData = await getCardsData();
    this.setState({ cardsData });
  }

  render() {
    // We can notice in the first render, cardsData is empty
    // thats why <Spinner /> is render at first time,
    // then componentDidMount lifecycle method is executed
    // retriving the cardsData and changing the state to provoke a re-render with the new state.
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => <SocialCard {...getSocialCardProps(card)} onLike={this.hanldeClickLike} onRetweet={this.hanldeClickRetweet} />
            )}
          </div>
        );
  }
}
```

## Stateful component
A stateful component is a component that will store a state, so you can use that state in order to change your view.
```javascript
// A stateful component should be declared as a Class extended
// by React.Component or React.PureComponent. In react 16 we
// can add a state hook to functional components.
class SocialCardsPage extends React.Component {

  state = {
    cardsData: [] // cardsData state initilialized as an empty array
  };

  async componentDidMount() {
    const cardsData = await getCardsData();
    // Here we change the state "cardsData" with setState in 
    // order to provoke a re-render in the view
    this.setState({ cardsData });
  }

  render() {
    // this ternary condition help us to show a spinner
    // until we get the cards data
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => <SocialCard 
                          {...getSocialCardProps(card)}
                          onLike={this.hanldeClickLike}
                          onRetweet={this.hanldeClickRetweet}
                        />
            )}
          </div>
        );
  }
}
```
## Functional components
A functional component is a more simple component that doesn't have state and a complex lifecycle neither. This is useful just to render a small pices of reusable components.

```javascript
// A functional component is a javascript function that recieves as paramenters its props.
// And returns the jsx to render.
function CardAction(
  /* props */
  { icon, count, onClick, className, active, id } 
  ) {
  return (
    <div 
      className={`socia-card--action ${className} 
      ${active ? 'active' : ''}`}
      onClick={(e) => onClick(e, id)}
    >
      <span className="action__icon">{icon}</span>
      <span className="action__count">{count}</span>
    </div>
  );
}
```

## Side Effects inside components
There are a lot of solutions to handle side effects but all depends in how you are handling the state of your app. In this case we are handling our state directly inside the component that's why we are using componentDidMount to handle our side effect (also we could use componentDidUpdate, but CDM is executed just once after the component has been render the first time, thats why is better than CDU).
```javascript
class SocialCardsPage extends React.Component {

  async componentDidMount() {
    // After the first render CDM will be executed
    // handling the request to then change the state of the component.
    const cardsData = await getCardsData();
    this.setState({ cardsData });
  }

  render() {
    // this ternary condition help us to show a spinner until we get the cards data
    return ...
  }
}
```

## Ternary conditions inside JSX
JSX is a syntax extension for javascript. This help us to develop components faster and have clear what we are trying to render. [more info](https://reactjs.org/docs/introducing-jsx.html)

```javascript
class SocialCardsPage extends React.Component {
  
  // In the return statement we can notice the use of ternary 
  // condition (? :) in order to display <Spinner /> or 
  // <Stories--container /> 

  // JSX allow us use all the javascript power in order 
  // to create logic inside the template. That's why we can 
  // use conditional operator and loops.
  render() {
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => 
                <SocialCard
                  {...getSocialCardProps(card)}
                  onLike={this.hanldeClickLike}
                  onRetweet={this.hanldeClickRetweet}
                />
            )}
          </div>
        );
  }
}
```

## Loops inside JSX
Because JSX allow us use javascript, we can create loops in order to create dynamically components.

```javascript
class SocialCardsPage extends React.Component {
  
  // We ar mapping the cardsData array into 
  // new array of SocialCard components.
  // [ CardDataObj{} ] => [<SocialCard />]
  render() {
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => 
                <SocialCard
                  {...getSocialCardProps(card)}
                  onLike={this.hanldeClickLike}
                  onRetweet={this.hanldeClickRetweet}
                />
            )}
          </div>
        );
  }
}
```

## Dynamic properties
JSX allow us set any javascript sentence inside brackets `{}` so we can set variable values as a propery

```javascript
class SocialCardsPage extends React.Component {

  hanldeClickLike = (event, id) => { /* ... */ }

  hanldeClickRetweet = (event, id) => { /* ... */ }
  
  // We can notice some very useful uses for dynamic props.

  // One is the use of handler events, we can declare 
  // handlers out of our jsx and then just pass the 
  // function as a variable inside the brackets.

  // The next one is a feature in es6 called `destructuring`,
  // so we use this feature using a function that retrieve 
  // us the object with all the props that our SocialCard 
  // component use and then destructuring this object.
  render() {
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => 
                <SocialCard 
                  {...getSocialCardProps(card)}
                  onLike={this.hanldeClickLike}
                  onRetweet={this.hanldeClickRetweet} 
                />
            )}
          </div>
        );
  }
}
```

## Prop getters pattern

Prop getters is a pattern to split in a separete function the logic to retrieve the properties of a component.

```javascript
class SocialCardsPage extends React.Component {

  render() {
    return this.state.cardsData.length === 0
      ? <Spinner />
      : ( <div className="stories--container">
            {this.state.cardsData.map(
              (card) => 
                <SocialCard
                  {...getSocialCardProps(card)}
                  onLike={this.hanldeClickLike}
                  onRetweet={this.hanldeClickRetweet}
                />
            )}
          </div>
        );
  }
}
```