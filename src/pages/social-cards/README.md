# Table of contents

- [Social Cards](#social-cards)
  - [What we can learn](#what-we-can-learn)
  - [Life-cycle component](#life-cycle-component)
  - [Stateful component](#stateful-component)
  - [Functional components](#functional-components)
  - [Side Effects inside components](#side-effects-inside-components)
  - [Ternary conditions inside JSX](#ternary-conditions-inside-jsx)
  - [Loops inside JSX](#loops-inside-jsx)
  - [Dynamic properties](#dynamic-properties)
  - [Prop getters pattern](#prop-getters-pattern)

# Social cards

You can find this kind of components everywhere (blogs, twitter, pinterest, etc). This type of components are widely used along the web. They are specially useful when it comes to share information on social websites like Facebook, Twitter, Pinterest, blogs, etc.


### What we can learn

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
    // thats why <Spinner /> is rendered first,
    // then the componentDidMount lifecycle method is executed
    // retrieving the cardsData and changing the state to provoke a re-render with the new state.
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
    cardsData: [] // cardsData state initialized as an empty array
  };

  async componentDidMount() {
    const cardsData = await getCardsData();
    // Here we change the state "cardsData" with setState in 
    // order to provoke a re-render in the view
    this.setState({ cardsData });
  }

  render() {
    // this ternary condition helps us to show a spinner
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
A functional component is a much simpler component that doesn't have state nor a complex lifecycle either. This comes very handy when rendering small and reusable components.

```javascript
// A functional component is a javascript function that receives as parameters its own props.
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
There are a lot of solutions to handle side effects but all depends on how you are handling the state of your app. In this case we are handling our state directly inside of the component and that's why we are using componentDidMount to handle our side effect (also we could use componentDidUpdate, but CDM is executed just once after the component has been rendered the first time, that's why it is better than CDU).
```javascript
class SocialCardsPage extends React.Component {

  async componentDidMount() {
    // After the first render the CDM will be executed
    // and it will handle the request to then change the state of the component later.
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
JSX is a syntax extension for JavaScript. This allows us to develop components faster and to express better and cleaner what we are trying to render. [more info](https://reactjs.org/docs/introducing-jsx.html)

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
Thanks to JSX we can use JavaScript to write loops in order to create dynamically components.

```javascript
class SocialCardsPage extends React.Component {
  
  // We are mapping the cardsData array into 
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
Another use of JSX is the capablity to code JavaScript sentences inside brackets `{}` so we can set variable values as a propery

```javascript
class SocialCardsPage extends React.Component {

  hanldeClickLike = (event, id) => { /* ... */ }

  hanldeClickRetweet = (event, id) => { /* ... */ }
  
  // We can notice some very useful uses for dynamic props.

  // One is the use of handler events, we can declare 
  // handlers out of our jsx and then just pass the 
  // function as a variable inside the brackets.

  // The next one is a feature in es6 called `destructuring`,
  // this feature may be implemented by using a function that retrieves
  // us the object with all the props that our SocialCard 
  // component uses and then destructuring this object.
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

Prop getters is a pattern to split in a separate function the logic to retrieve the properties of a component.

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