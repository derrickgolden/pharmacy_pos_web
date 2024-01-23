type Medicine = {
  unitsPerContainer: number; // Number of units in a container (e.g., tablets, capsules, etc.)
  containersInStock: number; // Number of containers in stock
  openContainerUnits: number; // Number of units in the open container
};

export const calculateRemainingStock = (
  medicine: Medicine,
  unitsSold: number
): { error: boolean; msg: string; remainingContainers?: number; remainingUnits?: number } => {
  console.log(medicine);
  console.log("unitsSold: ", unitsSold);
  
  if (unitsSold < 0) {
    return {
      error: true,
      msg: 'Quantity sold cannot be negative.',
    };
  }

  const totalUnitsInStock =
    medicine.containersInStock * medicine.unitsPerContainer +
    medicine.openContainerUnits;

  if (unitsSold > totalUnitsInStock) {
    return {
      error: true,
      msg: 'Insufficient stock to fulfill the request.',
    };
  }

  let remainingUnits = medicine.openContainerUnits;

  // Deduct from the open container first
  if (remainingUnits >= unitsSold) {
    remainingUnits -= unitsSold;
  } else {
    // Deduct from the open container and then move to closed containers
    unitsSold -= remainingUnits;
    const closedContainersToDeduct = Math.ceil(unitsSold / medicine.unitsPerContainer);
    const remainingClosedContainers = Math.max(
      medicine.containersInStock - closedContainersToDeduct,
      0
    );

    remainingUnits =
      closedContainersToDeduct * medicine.unitsPerContainer - unitsSold;

      console.log("remainingClosedContainers: ", remainingClosedContainers)
      console.log("remainingUnits: ", remainingUnits)
    return {
      error: false,
      msg: '',
      remainingContainers: remainingClosedContainers,
      remainingUnits,
    };
  }

  return {
    error: false,
    msg: '',
    remainingContainers: medicine.containersInStock,
    remainingUnits,
  };
};
