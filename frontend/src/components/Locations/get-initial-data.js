let uniqueId = 0;
function getItems(count) {
  return Array.from({ length: count }, (v, k) => {
    const id = uniqueId++;
    return {
      id: `id:${id}`,
      text: `item ${id}`,
    };
  });
}

const initial = {
  columns: {
    "column-0": {
      id: "column-0",
      title: "1st column",
      items: getItems(1000),
    },
    "column-1": {
      id: "column-1",
      title: "2nd column",
      items: getItems(1000),
    },
    "column-2": {
      id: "column-2",
      title: "3rd column",
      items: getItems(1000),
    },
    "column-3": {
      id: "column-3",
      title: "4th column",
      items: getItems(1000),
    },
    "column-4": {
      id: "column-4",
      title: "5th column",
      items: getItems(1000),
    },
    "column-5": {
      id: "column-5",
      title: "6th column",
      items: getItems(1000),
    },
  },
  columnOrder: [
    "column-0",
    "column-1",
    "column-2",
    "column-3",
    "column-4",
    "column-5",
  ],
};

export default function getInitialData() {
  return initial;
}
