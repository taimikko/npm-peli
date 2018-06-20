export default ({ name, version, ...statistics }) => 
`<table>
<th>${name}@${version}</th>
 ${Object.entries(statistics)
.map(([prop, value]) => `<tr><td>${prop}</td><td>${value}</td></tr>`)
.join('')}
</table>`;


/*  `<h3>${name}@${version}</h3>
  <ul>
    ${Object.entries(statistics)
      .map(([prop, value]) => `<li>${prop}: ${value}</li>`)
      .join('')}
  </ul>`;
  */