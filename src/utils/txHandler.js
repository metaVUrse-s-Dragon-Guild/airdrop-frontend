export const txHandler = async (
    contract,
    contractFunction,
    parameters,
  ) => {
    let result;
    try {
      result = (
        await contract[contractFunction](...parameters)
      );

      await result.wait();
    } catch (error) {
      throw error
      // eslint-disable-next-line no-unreachable
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
  