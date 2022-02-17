import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import thunk from "redux-thunk";

// Redux doesn't have any types for this extension
const composeEnhancers =
	(process.env.NODE_ENV === "development"
		&& window
		&& (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
	|| compose;

const Store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  composeEnhancers && composeEnhancers()
));

export type RootStore = ReturnType<typeof rootReducer>

export default Store;

