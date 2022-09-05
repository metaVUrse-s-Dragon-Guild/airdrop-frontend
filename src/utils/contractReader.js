export const contractReader = async (
  contract,
  contractFunction,
  parameters = [],
) => {
  let result;
  try {
    result = (
      await contract[contractFunction](...parameters)
    ).toString();
  } catch (error) {
    if (error.message === 'header not found') {
      // this recursive call can repeat and repeat and hit max call stack!
      // be careful => add timeout
      // return useContractReader(
      //   contracts,
      //   contractNames,
      //   contractFunction,
      //   parameters,
      // );
    }
  }
  return result;
};
