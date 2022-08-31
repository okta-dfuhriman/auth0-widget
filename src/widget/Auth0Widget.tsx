import React from 'react';
import { MfaWidget } from '../components';
import initFontAwesome from '../utils/initFontAwesome';

export default class Auth0Widget {
	options: WidgetOptions;
	widget: React.ReactNode;

	constructor(options: WidgetOptions) {
		this.options = options;

		const widgetOptions = this.options;

		delete widgetOptions.container;

		this.widget = <MfaWidget {...widgetOptions} />;
		initFontAwesome();
	}

	/**
	 * Render the widget to an element.
	 * @param options - options for the widget.
	 * 		  Must have a container property in order to render the widget to!
	 */
	render(renderOptions: RenderOptions) {
		const { container = 'container' } = renderOptions;

		const el = document.getElementById(container);

		if (!el) {
			throw new Error(`An element with the given name '${container}' can be found in the document!`);
		}

		el.appendChild(this.widget as unknown as Node);

		return;
	}
}
