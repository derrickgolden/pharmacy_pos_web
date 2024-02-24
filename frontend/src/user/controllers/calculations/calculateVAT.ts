interface VatDetail {
    label: string;
    value: number;
  }
function calculateVAT(amount: number, vatPercentage: number): VatDetail[] {
    const vat = +(amount * vatPercentage / 100).toFixed(2);
    const exVAT = +(amount - vat).toFixed(2);
    const total = amount;
  
    return [
        { label: 'VAT%', value: vatPercentage },
        { label: 'VAT', value: vat },
        { label: 'ExVAT', value: exVAT },
        { label: 'Total', value: total },
      ];
  }

  export default calculateVAT;