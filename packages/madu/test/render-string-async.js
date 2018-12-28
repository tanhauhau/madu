import test from 'ava';
import { MaduAsync as Madu } from '../src';
import pretty from 'pretty';

test('<div />', async t => {
  t.snapshot(format(await <div />));
});

test('<div foo="bar" num={1} boo={true} />', async t => {
  t.snapshot(format(await <div foo="bar" num={1} boo={true} />));
});

test('with children', async t => {
  t.snapshot(
    format(
      await (
        <div>
          <h1>h1</h1>
          <h2>h2</h2>
        </div>
      )
    )
  );
});

test('with children array', async t => {
  t.snapshot(
    format(
      await (
        <ul>
          {[1, 2, 3].map(item => (
            <li className="item">{item}</li>
          ))}
          {[4, 5, 6].map(item => (
            <li className="item">{item}</li>
          ))}
        </ul>
      )
    )
  );
});

test('with conditional children array', async t => {
  t.snapshot(
    format(
      await (
        <ul>
          {[1, 2, 3, 4, 5, 6].map(
            item => item % 2 === 0 && <li className="item">{item}</li>
          )}
        </ul>
      )
    )
  );
});

test('with function 1', async t => {
  function App() {
    return <div>{'App'}</div>;
  }
  t.snapshot(format(await <App />));
});

test('with function return null', async t => {
  function App() {
    return null;
  }
  t.snapshot(format(await <App />));
});

test('with nested function', async t => {
  function App() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
  function Header() {
    return <div className="header" />;
  }
  function Body() {
    return <div className="body" />;
  }
  t.snapshot(format(await <App />));
});

test('with function props', async t => {
  function App({ headerClass, bodyClass }) {
    return (
      <div>
        <Header extraClass={headerClass} />
        <Body customClass={bodyClass} />
      </div>
    );
  }
  function Header({ extraClass }) {
    return <div className={`header ${extraClass}`} />;
  }
  function Body({ customClass }) {
    return <div className={'body ' + customClass} />;
  }
  t.snapshot(
    format(await <App headerClass="header-class" bodyClass={'body-class'} />)
  );
});

test('with conditional function array', async t => {
  function App({ list }) {
    return (
      <ul>
        {list.map(item =>
          item % 2 === 0 ? <Odd item={item} /> : <Even item={item} />
        )}
      </ul>
    );
  }
  function Odd({ item }) {
    return <div className="odd">{item}</div>;
  }
  function Even({ item }) {
    return <span className={'even-' + item}>{item}</span>;
  }
  t.snapshot(
    format(
      await (
        <>
          <div className="first-ten">
            <App list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
          </div>
          <div className="next-ten">
            <App list={[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} />
          </div>
        </>
      )
    )
  );
});

test('with fragment', async t => {
  function App() {
    return (
      <>
        <Header />
        <Body />
      </>
    );
  }
  function Header() {
    return <div className="header" />;
  }
  function Body() {
    return <div className="body" />;
  }
  t.snapshot(format(await <App />));
});

test('with render props', async t => {
  function RenderProps({ children }) {
    return <ul>{children([1, 2, 3, 4, 5])}</ul>;
  }
  t.snapshot(
    format(
      await (
        <RenderProps>{list => list.map(item => <li>{item}</li>)}</RenderProps>
      )
    )
  );
});

function format(html) {
  return pretty(html, { ocd: true });
}
