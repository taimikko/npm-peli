import button from './button';
export default children => `<div>
<h1>${children.name}</h1>
<table>
<colgroup>
<col span="2" style="background-color:red">
<col style="background-color:grey">
</colgroup>
<tr>
<th>veikkaa</th><th>oma</th><th>vastustaja</th>
</tr><tr>
<td>${button(`app.palaa("releases")`, "releases")} </td>
<td>${children.releases}</td>
</tr><tr>
<td>${button(`app.palaa("dependencies")`, "dependencies")} 
</td><td>${children.dependencies}</td>
</tr>
<tr><td>${button(`app.palaa("dependents")`, "dependents")}</td>
<td>${children.dependents}</td>
</tr><tr>
<td>${button(`app.palaa("downloadsLastMonth")`, "downloadsLastMonth")} </td>
<td>${children.downloadsLastMonth}</td>
</tr><tr>
<td>${button(`app.palaa("maintenance")`, "maintenance")} </td>
<td>${children.maintenance}</td>
</tr><tr>
<td>${button(`app.palaa("openIssues")`, "openIssues")} </td>
<td>${children.openIssues}</td>
</tr><tr>
<td>${button(`app.palaa("openPullRequests")`, "openPullRequests")} </td>
<td>${children.openPullRequests}</td>
</tr><tr>
<td>${button(`app.palaa("popularity")`, "popularity")} </td>
<td>${children.popularity}</td>
</tr><tr>
<td>${button(`app.palaa("quality")`, "quality")} </td>
<td>${children.quality}</td>
</tr>
</table>
</div>`;
