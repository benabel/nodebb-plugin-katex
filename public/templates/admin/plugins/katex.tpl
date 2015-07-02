<div class="row">
	<div class="col-lg-9">
		<form class="form katex-settings">
			<div class="panel panel-default">
				<div class="panel-heading">Katex</div>
				<div class="panel-body">
					<div class="row">
						<div class="panel panel-default">
							<div class="panel-heading">Katex delimiters</div>
							<div class="panel-body">
								<div class="form-group">
									<label for="highlight">
										<input type="checkbox" name="highlight" id="highlight" /> Automatically detect and highlight code blocks
									</label>
								</div>
								<div class="form-group">
									<label for="highlightTheme">Use this theme for highlighted code blocks</label>
									<select class="form-control" name="highlightTheme" id="highlightTheme">
										<!-- BEGIN themes -->
										<option value="{themes.name}">{themes.name}</option>
										<!-- END themes -->
									</select>
								</div>
								<div class="form-group">
									<label for="langPrefix">
										Prefix for
										<code>code</code> blocks
									</label>
									<input class="form-control" placeholder="language-" type="text" name="langPrefix" id="langPrefix" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
