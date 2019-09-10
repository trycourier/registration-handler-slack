interface CourierState {
  recipient: string;
}

export default (state: string): CourierState => {
  if (state && state.length && state[0] === '{') {
    try {
      return JSON.parse(state) as CourierState;
    } catch {
      return {
        recipient: state
      };
    }
  } else {
    return {
      recipient: state
    };
  }
}