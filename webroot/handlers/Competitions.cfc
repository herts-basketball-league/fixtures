component extends=coldbox.system.EventHandler {
	property name='hyper' inject='HyperBuilder@hyper';

	// property name="TeamSportzClient" inject="TeamSportzClient";

	function index( event, rc, prc ) {
		if( ! session.keyExists( 'currentUser' ) ) {

			var userRequest = hyper.post(
				'https://scheduler.leaguelobster.com/api/access-token',
				{
					'username': 'richard+hbl@infoweb.co.uk',
					'password': 'fifty-lifetime-freezer'
				}
			);

			session.currentUser = userRequest.getData().deserializeJSON();
		}


// writedump( var=session.currentUser, label='session.currentUser', expand=0, abort=0 );


		var seasonRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/season' )
			.send();

		prc.seasons = seasonRequest.getData().deserializeJSON();


// writedump( var=prc.season, label='season', expand=0, abort=0 );



		var teamRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team' )
			.send();

		prc.teams = teamRequest.getData().deserializeJSON();


// writedump( var=prc.teams, label='teams', expand=0, abort=1 );


		var matchRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team/23977671/matches' )
			.send();

		prc.matches = matchRequest.getData().deserializeJSON();


// writedump( var=prc.matches, label='matches', expand=1, abort=0 );


// abort;

/*

		if( ! session.keyExists( 'currentUser' ) ) {
			var userRequest = hyper.post(
				'https://api.teamsportz.pro/v1/auth/login',
				{
					'email': 'richard+ravens@infoweb.co.uk',
					'password': 'escaping-yogi-mast-A7'
				}
			);

			session.currentUser = userRequest.getData().deserializeJSON();
		}

writedump( var=session.currentUser, label='session.currentUser', expand=0, abort=0 );




		var organisationRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'Bearer #session.currentUser.token#' } )
			.setUrl( 'https://api.teamsportz.pro/organisations/#session.currentUser.permissions[1].org_id#' )
			.send();

		var organisation = organisationRequest.getData().deserializeJSON();


writedump( var=organisation, label='Organisation', expand=0, abort=0 );





		var teamRequest = hyper.setMethod( 'GET' )
			.withHeaders( {
				'Authorization': 'Bearer #session.currentUser.token#'
				,'Organisation': '260071'
			} )
			.setUrl( 'https://api.teamsportz.pro/teams/' )
			.send();

		var team = teamRequest.getData().deserializeJSON();


writedump( var=team, label='Team', expand=0, abort=0 );




		var squadRequest = hyper.setMethod( 'GET' )
			.withHeaders( {
				'Authorization': 'Bearer #session.currentUser.token#'
				,'Organisation': '260071'
			} )
			.setUrl( 'https://api.teamsportz.pro/teams/squad/816/' )
			.send();

		var squad = squadRequest.getData().deserializeJSON();


writedump( var=squad, label='Squad', expand=0, abort=0 );





		var fixtureRequest = hyper.setMethod( 'GET' )
			.withHeaders( {
				'Authorization': 'Bearer #session.currentUser.token#'
				,'Organisation': '260071'
				,'Admin-Token': 'something'
			} )
			.setUrl( 'https://api.teamsportz.pro/v1/events/?team_id=816&from_date=2025-09-01&to_date=2026-06-01' )
			// .setUrl( 'https://api.teamsportz.pro/organisations/260071' )
			// .setUrl( 'https://api.teamsportz.pro/organisations/260070' )
			.send();

		var fixture = fixtureRequest.getData().deserializeJSON();


writedump( var=fixture, label='fixture', expand=1, abort=0 );





abort;



		var clubsRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'Bearer #session.currentUser.token#' } )
			.setUrl( 'https://api.teamsportz.pro/v1/clubs?type=club' )
			// .setBody( {
			// 	title: 'New Title'
			// } )
			.send();



		// var clubsRequest = hyper.get( 'https://api.teamsportz.pro/v1/clubs' )
		// 	.withHeaders( { "Authorization" = "Bearer #user.token#" } );

		var clubs = clubsRequest.getData().deserializeJSON();

		writedump( var=clubs, label='xx', expand=1, abort=1 );



		// writedump( var=competitions.getData(), label='xx', expand=1, abort=1 );



*/
	}
}
