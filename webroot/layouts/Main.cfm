<cfoutput><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Fixtures | Herts Basketball League</title>
	<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
</head>

<body>
	<header>
		<nav>
			<a href="/?fwreinit">Home</a>
			<a href="#event.buildLink( 'competitions' )#">Competitions</a>
			<a href="#event.buildLink( 'clubs' )#">Clubs</a>
			<a href="#event.buildLink( 'teams' )#">Teams</a>
			<a href="#event.buildLink( 'fixtures' )#">Fixtures</a>
		</nav>
	</header>

	<h1>Herts Basketball League</h1>

	#view()#
</body>
</html></cfoutput>
