component extends=coldbox.system.EventHandler {
	property name='hyper' inject='HyperBuilder@hyper';

	function index( event, rc, prc ) {
		if( ! session.keyExists( 'currentUser' ) ) {

			var userRequest = hyper.post(
				'https://scheduler.leaguelobster.com/api/access-token',
				{
					'username': 'richard+hbl@infoweb.co.uk',
					'password': 'fifty-lifetime-freezer'
				}
			);

			session.currentUser = userRequest.json();
		}

		if( url.keyExists( 'refresh' ) ) {
			application.delete( 'cache' );
		} else {
			application.cache = {};
		}

		prc.seasons = getData( 'seasons' );


writedump( var=prc.seasons, label='prc.seasons', expand=0, abort=0 );

/*
		var seasonRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/season' )
			.send();

		if( seasonRequest.isError() ) {
			writedump( var=seasonRequest.getMemento(), label='League Lobster Error - Seasons', expand=0, abort=0 );
		}

// writedump( var=seasonRequest.getHeader(), label='', expand=0, abort=0 );
// writedump( var=seasonRequest.isOK(), label='', expand=0, abort=1 );
// writedump( var=seasonRequest.getStatus(), label='', expand=0, abort=1 );
// writedump( var=seasonRequest.getStatusCode(), label='', expand=0, abort=1 );

		try {
			prc.seasons = seasonRequest.json();
		} catch( any exception ) {
			writedump( var=exception, label='League Lobster Exception - Seasons', expand=0, abort=1 );
		}
*/

		prc.teams = getData( 'teams' );


writedump( var=prc.teams, label='prc.teams', expand=0, abort=0 );


/*
		var teamRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team' )
			.send();

		if( teamRequest.isError() ) {
			writedump( var=teamRequest.getMemento(), label='League Lobster Error - Teams', expand=0, abort=0 );
		}

		try {
			prc.teams = teamRequest.json();
		} catch( any exception ) {
			writedump( var=exception, label='League Lobster Exception - Teams', expand=0, abort=1 );
		}
*/

		prc.matches = getData( 'matches', 23977671 );


writedump( var=prc.matches, label='prc.matches', expand=0, abort=0 );

/*
		var matchRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team/23977671/matches' )
			.send();

		if( matchRequest.isError() ) {
			writedump( var=matchRequest.getMemento(), label='League Lobster Error - Matches', expand=0, abort=0 );
		}

		try {
			prc.matches = matchRequest.json();
		} catch( any exception ) {
			writedump( var=exception, label='League Lobster Exception - Matches', expand=0, abort=1 );
		}
*/
	}

	function getData( endpoint, id='' ) {
		switch( endpoint ) {
			case 'seasons':
				var urlPart = 'season';
			break;

			case 'teams':
				var urlPart = 'team';
			break;

			case 'matches':
				var urlPart = 'team/#id#/matches';
			break;

			default:
		}

		if( application.cache.keyExists( endpoint ) ) {
			return application.cache[ endpoint ];
		} else {
			var endpointRequest = hyper.setMethod( 'GET' )
				.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
				.setUrl( 'https://scheduler.leaguelobster.com/api/#urlPart#' )
				.send();

			switch( endpointRequest.getStatusCode() ) {
				case '429':
					sleep( 5000 );

					var endpointRequest = hyper.setMethod( 'GET' )
						.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
						.setUrl( 'https://scheduler.leaguelobster.com/api/#urlPart#' )
						.send();

				break;

				default:
			}

			if( endpointRequest.isError() ) {
writedump( var=endpointRequest.getMemento(), label='League Lobster Error - #endpoint#', expand=0, abort=0 );
			}

			try {
				var dataset = endpointRequest.json();
			} catch( any exception ) {
writedump( var=exception, label='League Lobster Exception - #endpoint#', expand=0, abort=1 );
			}

			application.cache[ endpoint ] = dataset;

			return application.cache[ endpoint ];
		}
	}

	/**
	 * --------------------------------------------------------------------------
	 * Implicit Actions
	 * --------------------------------------------------------------------------
	 * All the implicit actions below MUST be declared in the config/Coldbox.cfc in order to fire.
	 * https://coldbox.ortusbooks.com/getting-started/configuration/coldbox.cfc/configuration-directives/coldbox#implicit-event-settings
	 */

	function onAppInit( event, rc, prc ) {
	}

	function onRequestStart( event, rc, prc ) {
	}

	function onRequestEnd( event, rc, prc ) {
	}

	function onSessionStart( event, rc, prc ) {
	}

	function onSessionEnd( event, rc, prc ) {
		var sessionScope     = event.getValue( 'sessionReference' );
		var applicationScope = event.getValue( 'applicationReference' );
	}

	function onException( event, rc, prc ) {
		event.setHTTPHeader( statusCode = 500 );
		// Grab Exception From private request collection, placed by ColdBox Exception Handling
		var exception = prc.exception;
		// Place exception handler below:
	}
}
