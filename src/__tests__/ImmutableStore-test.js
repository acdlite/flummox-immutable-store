import ImmutableStore from '../ImmutableStore';
import Immutable from 'immutable';
import isPlainObject from 'lodash.isplainobject';

describe('ImmutableStore', () => {
  it('should throw if options.getStateRecord is not a Record', () => {
    class BadStore extends ImmutableStore {
      constructor() {
        super({
          StateRecord: 'lol'
        });
      }
    }

    class GoodStore extends ImmutableStore {
      constructor() {
        super({
          StateRecord: new Immutable.Record({ foo: 'bar' })
        });
      }
    }

    expect(() => new GoodStore()).not.to.throw();

    expect(() => new BadStore()).to.throw(
      'Expected options.StateRecord to be an Immutable Record class, but '
    + 'instead got lol. Check the constructor of BadStore.'
    );
  });

  it('should use options.StateRecord instance as initial state', () => {
    class Store extends ImmutableStore {
      constructor() {
        super({
          StateRecord: new Immutable.Record({
            initial: 'state',
            react: 'iskewl',
          })
        });
      }
    }

    const store = new Store();

    expect(store.state.toJS()).to.deep.equal({
      initial: 'state',
      react: 'iskewl',
    });
  });

  describe('.assignState()', () => {
    it('should return a copy of newState if oldState is nonexistent', () => {
      const StateRecord = new Immutable.Record({
        do: 're',
        mi: 'fa',
      });

      class Store extends ImmutableStore {
        constructor() {
          super({ StateRecord });
        }
      }

      const initialState = new StateRecord();

      const newState = initialState.set('do', 'a deer');

      expect(Store.assignState(null, newState).toJS()).to.deep.equal({
        do: 'a deer',
        mi: 'fa',
      });

      expect(Store.assignState(undefined, newState).toJS()).to.deep.equal({
        do: 'a deer',
        mi: 'fa',
      });
    });
  });

  describe('#setState()', () => {
    it('should deeply convert plain objects', () => {
      class Store extends ImmutableStore {
        constructor() {
          super({
            re: 'mi',
            fa: 'so',
          });
        }
      }
    });
  });

  describe('#getStateAsObject()', () => {
    it('should shallowly convert state to object and return it', () => {
      const foo = new Immutable.List([1, 2, 3]);
      const bar = new Immutable.List(['a', 'b', 'c']);

      const StateRecord = new Immutable.Record({ foo, bar });

      class Store extends ImmutableStore {
        constructor() {
          super({ StateRecord });
        }
      }

      const store = new Store();
      const stateObject = store.getStateAsObject();

      expect(isPlainObject(stateObject)).to.be.true;
      expect(stateObject.foo).to.equal(foo);
      expect(stateObject.bar).to.equal(bar);
    });
  });
});
