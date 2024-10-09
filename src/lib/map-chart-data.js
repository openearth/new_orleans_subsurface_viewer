
export default (array, options = { showHours: true }) => {
    const { showHours } = options;
  
    return array
      .sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      })
      .map((item) => {
        const { datetime, head } = item;
        const dateParts = datetime.split(', ');
        const date = new Date(...dateParts);
        const hours = date.getHours().toString().padStart(2, '0');
        const formattedDate = `${ date.getDate().toString().padStart(2, '0') }/${ (date.getMonth() + 1).toString().padStart(2, '0') }/${ date.getFullYear() } ${ showHours ? `${ hours }:00` : '' }`;
  
        return {
          dateObj: date,
          date: formattedDate,
          head: parseFloat(head, 10),
        };
      });
  };