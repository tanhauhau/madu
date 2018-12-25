import test from 'ava';
import Madu from '../src';

test('<div />', async t => {
  t.snapshot(await <div />);
});

test('<div foo="bar" num={1} boo={true} />', async t => {
  t.snapshot(await <div foo="bar" num={1} boo={true} />);
});

test('with children', t => {
  t.snapshot(
    await (
      <div>
        <h1>h1</h1>
        <h2>h2</h2>
      </div>
    )
  );
});

test('with children array', t => {
  t.snapshot(
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
  );
});
