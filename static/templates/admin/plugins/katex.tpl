<div class="row">
	<div class="col-lg-9">
		<form class="form katex-settings">
			<div class="panel panel-default">
				<div class="panel-heading">Katex</div>
				<div class="panel-body">
					<div class="row">
						<form role="form" class="katex-settings">
							<div class="form-group">
								<label for="dollarInline">
									<input type="checkbox" name="dollarInline" id="dollarInline" /> Use
									<code>$</code> to enclose inline maths.
								</label>
								<div class="alert alert-warning">
									<strong><i class="icon-warning-sign"></i> Careful!</strong>
									<p>
										LaTeX uses this, but it ruins the display of normal `$` in text.
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
	</div>
	<div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Katex Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>
