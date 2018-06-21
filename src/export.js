export function encode(data, columns) {
    const csv = [];
    if (data && data.length && columns && columns.length) {
        const headers = [];
        for (let i = 0; i < columns.length; i++) {

            const column = columns[i];
            let header = column.Header;
            if (header && header instanceof String) {
                header = `${header.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/mg, "\\r").replace(/\n/mg, "\\n").replace(/\t/mg, "\\t")}"`;
            }
            headers.push(header);

        }
        csv.push(headers.join(','));

        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            const row = [];
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                const {id} = column;
                let cell = obj[id];

                if (typeof cell === 'string') {
                    cell = `"${cell.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/mg, "\\r").replace(/\n/mg, "\\n").replace(/\t/mg, "\\t")}"`;
                }

                row.push(cell);

            }
            csv.push(row.join(','));
        }
    }
    return csv.join("\n");
}

export function downloadCsv(csv, filename) {
    const csvFile = new Blob([csv], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

export function downloadJSON(json, filename) {
    const jsonFile = new Blob([json],{type: "application/json"});
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(jsonFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
export function encodeJson(data){
  const jsonData=[];
  const data_grid=[];
  var obj ={};

    var i;
    for (i=0;i<data.length;i++){
      //var key_array=(Object.keys(data[0]._original));
      //var objects_array =(Object.values(data[0]._original));

      var a = data[i]._original;
      var c = data.length - 1;
      console.log(c);

      //var b =a.replace('"}','"},\n');

      jsonData.push(a);

      //data_grid.push(jsonData);
      //jsonData.push(Object.keys(data[i]._original));
    }
    //console.log(key_array);
    //console.log(objects_array);
    console.log(jsonData);
    return jsonData;

}
export function exportTableToJSON(data,filename) {
    const data_json = {
      data: encodeJson(data)
    }

    downloadJSON(JSON.stringify(data_json), filename);
}

export function exportTableToCSV(data, columns, filename) {
    const csv = encode(data, columns);
    downloadCsv(csv, filename);
}
