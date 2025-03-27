export function useLetters() {

  const state = useState('letters', () => ({
    included: [] as string[],
    excluded: [] as string[],
    position: [] as string[],
    flashing: [] as string[],
  }));

  const addLetter = (letter: string, type: "included" | "excluded"): Boolean => {

    if (state.value.excluded.includes(letter) || state.value.included.includes(letter)) {
      const index = state.value.flashing.indexOf(letter);
      if (index > -1) {
        state.value.flashing.splice(index, 1);
      }
      
      setTimeout(() => {
        state.value.flashing.push(letter);
      }, 0);
      resetFlashing();
      return false;
    }

    state.value[type].push(letter);
    console.log(`in: ${state.value['included']} | ex: ${state.value['excluded']}`)

    return true;
  }

  const removeLetter = (letter: string, type: "included" | "excluded"): Boolean => {
    const index = state.value[type].indexOf(letter);
    if (index > -1) {
      state.value[type].splice(index, 1);
      return true;
    }
    return false
  }

  const resetFlashing = () => {
    setTimeout(() => {
      state.value.flashing.shift()
    }, 600);
  }

  const setPositional = (letters: string[]) => {
    state.value.position = letters;
  }

  const getData = () => {
    return state.value;
  }

  return {
    state,
    addLetter,
    removeLetter,
    setPositional,
    getData,
  }
};