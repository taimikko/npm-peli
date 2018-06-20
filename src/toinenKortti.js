import keyValue from './keyValue'
export default children => {
    let k = Object.keys(children);
    let v = Object.values(children);
    let j = k.length
    let str = "";
    for (let i = 0; i < j; i++) { str += keyValue(k[i], v[i]) }
    console.log(str)
    return str
}

/*
<tr>
<td>${button(`app.pelaa("dependencies")`, "dependencies")} 
</td><td>${children.dependencies}</td>
</tr>
*/

/*
`
<div>
<h1>${children.name}</h1>
<table>
<tr><th>vastustaja</th><th>${children.name}</th></tr>
`
        `
<tr><td>dependents</td><td>${children.dependents}</td></tr>
</table>
</div>`;
*/

/*
Suosikkisupersankarisi on siis {{supersankari}}.
<ul>
  <li *ngFor="let t of tuloslista">
    {{t[0]}}: {{t[1]}}
  </li>
</ul>
*/