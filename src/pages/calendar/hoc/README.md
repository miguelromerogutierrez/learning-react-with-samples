# Calendar app as HOc

The High Order components are functions that enrich the behavior of a component, these are similar as the High Order functions (map, filter, reduce, etc). The principal goal of the HOCs are reuse logic between components, let's see how a HOf works first:

```javascript
/**
 * double is a function that double the value of a number;
 * double(5) -> 10
 * double(10) -> 20
 */ 
const double = (a) => a * 2;

/**
 * map receives two parameter, an array to iterate
 * and a function that will be executed on every 
 * iteration.
 */
const map = (array, predicate) => {
  if (!Array.isArray(array)) throw new Error('array should be an array');
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(predicate(array[i], i, array));
  }
  return result;
}

/**
 * In that way we can use double to modify all the elements
 * in an array, like [1,2,3,4,5], with the help of map.
 * Map is the High order function.
 */ 
map([1,2,3,4,5], double); // [2,4,6,8,10]

/**
 * Mathemathicaly if we call map as F and double as g
 * we can express them like F(g()), where F is compounding g
 */ 
```

`map` is 100% reusable in any situation we want to modify an array of elements (notice how i said `elements`, because it can be integers, strings, objects, etc). In React we use components instead of functions but the approach is the same.

## Reusable state

In our case we want to separete the state of the calendar and the state of the events. Why separate these states? the response is, for comfort. Think on these two states by separate will be easier than try to have both on the same place.

The Hoc `withCalendarState` is perfect to understand the basics.

```javascript
function withCalendarState(Component) {
  /**
   * A HOc will always return a component
   * this component will have our reusable state.
   * And as you can see we will receive as parameter a Component
   * this will be the component to share our state.
   */
  return class CalendarState extends React.Component {
    ... // here we define propTypes and default props

    // define our state
    state = {
      calendar: {}
    };

    // here we initialize our state
    componentDidMount() {
      this.goToday();
    }
    
    // the next functions work to manipulate our state
    nextYear = () => { ... };
  
    prevYear = () => { ... };
  
    nextMonth = () => { ... };
  
    prevMonth = () => { ... };

    goToday = () => { ... };

    getCalendarApi = () => {
      return {
        ...this.state.calendar,
        prevMonth: this.prevMonth,
        nextMonth: this.nextMonth,
        goToday: this.goToday
      }
    }
  
    render() {
      /**
       * Now in the render we return the Component that we receive
       * as parameter with the same props that we receive 
       * and adding the calendar prop with the state and its methods.
       * 
       */ 
      return <Component
        {...this.props}
        calendar={this.getCalendarApi()}
      />
    }
  }
}
```

## How to use a Hoc?

Once we get our Hoc we are ready to use it in the same way as a High order function.

```javascript
const withCalendarState = (Component) => {...};
const CalendarApp = (props) => {...};

const CalendarWithState = withCalendarState(CalendarApp);
ReactDOM.render(
  <CalendarWithState />,
  document.getElementById('root')
);
```

Notice that `withCalendarState` compounds `CalendarApp` (Remember `F(g())`) and returns this composition. Rendered in the DOM we can see it as:

```html
<CalendarState>
  <CalendarApp>
    ...
  </CalendarApp>
</CalendarState>
```

Also this is the reason why we need to spread the props to `Component`.
```javascript
return <Component
        {...this.props}
        calendar={this.getCalendarApi()}
```
The component that returns `withCalendarState` (`CalendarState`) will receive first the props then we need to spread this props to the component CalendarApp whose need it.
