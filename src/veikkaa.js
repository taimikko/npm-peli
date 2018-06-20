import button from './button';
export default children => `<div>
<h1>joku paketti</h1>
<table>
<colgroup>
<col span="1" style="background-color:red">
<col style="background-color:grey">
</colgroup>
<tr>
<th>veikkaa</th><th>vastustaja</th><th></th>
</tr>
<tr>
<td>${button(`app.palaa("releases")`, "releases")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("dependencies")`, "dependencies")} 
</td><td></td>
</tr>
<tr><td>${button(`app.palaa("dependents")`, "dependents")}</td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("downloadsLastMonth")`, "downloadsLastMonth")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("maintenance")`, "maintenance")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("openIssues")`, "openIssues")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("openPullRequests")`, "openPullRequests")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("popularity")`, "popularity")} </td>
<td></td>
</tr><tr>
<td>${button(`app.palaa("quality")`, "quality")} </td>
<td></td>
</tr>
</table>
</div>`;