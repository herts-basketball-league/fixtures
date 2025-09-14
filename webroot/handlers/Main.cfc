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

			session.currentUser = userRequest.getData().deserializeJSON();
		}

		var seasonRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/season' )
			.send();

		if( seasonRequest.isError() ) {
			writedump( var=seasonRequest.getMemento(), label='', expand=0, abort=0 );
		}

// writedump( var=seasonRequest.getHeader(), label='', expand=0, abort=0 );
// writedump( var=seasonRequest.isOK(), label='', expand=0, abort=1 );
// writedump( var=seasonRequest.getStatus(), label='', expand=0, abort=1 );
// writedump( var=seasonRequest.getStatusCode(), label='', expand=0, abort=1 );


		prc.seasons = seasonRequest.getData().deserializeJSON();

		var teamRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team' )
			.send();

		if( teamRequest.isError() ) {
			writedump( var=seasonRequest.getMemento(), label='', expand=0, abort=0 );
		}

		prc.teams = teamRequest.getData().deserializeJSON();

		var matchRequest = hyper.setMethod( 'GET' )
			.withHeaders( { 'Authorization': 'JWT #session.currentUser.token#' } )
			.setUrl( 'https://scheduler.leaguelobster.com/api/team/23977671/matches' )
			.send();

		if( matchRequest.isError() ) {
			writedump( var=seasonRequest.getMemento(), label='', expand=0, abort=0 );
		}

		prc.matches = matchRequest.getData().deserializeJSON();
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
