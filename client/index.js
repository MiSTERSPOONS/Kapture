import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)