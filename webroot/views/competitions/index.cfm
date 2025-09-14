<cfoutput>
<!---
	<h2>Competitions</h2>

	<ul>
		<li><a href="">Division 1</a></li>
		<li><a href="">Division 2</a></li>
		<li><a href="">Division 1 Cup</a></li>
		<li><a href="">Division 2 Cup</a></li>
	</ul>
--->

	<!--- <cfdump var='#prc.season#' label='prc.season' expand=0 abort=0> --->


	<h2>Seasons</h2>

	<!--- <cfdump var='#prc.season#' label='seasons' expand=1 abort=0> --->

	<figure>
		<table>
			<thead>
				<tr>
					<!--- <th>ID</th> --->
					<th>Name</th>
					<th>League</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Games</th>
					<th>Duration</th>
					<th>Weeks</th>
				</tr>
			</thead>

			<tbody>
				<cfloop array="#prc.seasons#" index="season">
					<tr>
						<!--- <td>#season.id#</td> --->
						<td>#season.name#</td>
						<td>#season.league_name#</td>
						<td>#season.startdate.parseDateTime().dateFormat( 'ddd, d mmm yy' )#</td>
						<td>#season.enddate.parseDateTime().dateFormat( 'ddd, d mmm yy' )#</td>
						<td>#season.numgames#</td>
						<td>#season.duration_game# mins</td>
						<td>#season.numweeks#</td>
					</tr>
				</cfloop>
			</tbody>
		</table>
	</figure>

	<!--- <cfdump var='#prc.teams#' label='teams' expand=1 abort=0> --->

	<h2>Teams</h2>

	<figure>
		<table>
			<thead>
				<tr>
					<!--- <th>ID</th> --->
					<th>Name</th>
				</tr>
			</thead>

			<tbody>
				<cfloop array="#prc.teams#" index="team">
					<tr>
						<!--- <td>#team.id#</td> --->
						<td>#team.name#</td>
					</tr>
				</cfloop>
			</tbody>
		</table>
	</figure>

	<!--- <cfdump var='#prc.matches#' label='matches' expand=0 abort=0> --->

	<h2>Matches</h2>

	<figure>
		<table>
			<thead>
				<tr>
					<!--- <th>ID</th> --->
					<th>Date/tipoff</th>
					<th>Venue</th>
					<th>Home</th>
					<th>Away</th>
				</tr>
			</thead>

			<tbody>
				<cfloop array="#prc.matches#" index="match">
					<tr>
						<!--- <td>#match.id#</td> --->
						<td>#match.start.parseDateTime().dateTimeFormat( 'ddd, d mmm yy @ HH:nn' )#</td>
						<td>#match.venue_name#</td>
						<td>#match.home_team_name#</td>
						<td>#match.away_team_name#</td>
					</tr>
				</cfloop>
			</tbody>
		</table>
	</figure>
</cfoutput>
