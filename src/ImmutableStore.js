import { Store } from 'flummox';
import { Record } from 'immutable';

export default class ImmutableStore extends Store {
  constructor(options = {}) {
    super();

    const { StateRecord } = options;
    this.StateRecord = StateRecord;

    // Check that StateRecord is a Record class
    if (!(StateRecord && StateRecord.prototype instanceof Record)) {
      const className = this.constructor.name;

      throw new TypeError(
        `Expected options.StateRecord to be an Immutable `
      + `Record class, but instead got ${StateRecord}. Check the constructor `
      + `of ${className}.`
      );
    }

    this.state = new StateRecord();
  }

  static assignState(oldState, newState) {
    if (!exists(oldState)) {
      const StateRecord = newState.constructor;
      oldState = new StateRecord();
    }

    return oldState.merge(oldState, newState);
  }

  getStateAsObject() {
    if (this.state instanceof Record) {
      return this.state.toObject();
    } else {
      return null;
    }
  }
}

function exists(val) {
  return val !== undefined && val !== null;
}
