import { UmbBlockWorkspaceEditorElement } from './block-workspace-editor.element.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('UmbBlockWorkspaceEditorElement', () => {
	it('is defined with its own instance', async () => {
		const element = await fixture<UmbBlockWorkspaceEditorElement>(
			html`<umb-block-workspace-editor></umb-block-workspace-editor>`,
		);
		expect(element).to.be.instanceOf(UmbBlockWorkspaceEditorElement);
	});

	describe('a headline longer than the available width', () => {
		it('stays within the editor instead of overflowing it', async () => {
			const container = await fixture<HTMLDivElement>(
				html`<div style="width: 400px">
					<umb-block-workspace-editor></umb-block-workspace-editor>
				</div>`,
			);
			const element = container.querySelector('umb-block-workspace-editor') as UmbBlockWorkspaceEditorElement;
			await element.updateComplete;

			const headline = element.shadowRoot!.querySelector('#headline') as HTMLElement;
			headline.textContent = 'A block label that is far wider than the space it is given '.repeat(4);

			expect(headline.getBoundingClientRect().right).to.be.at.most(element.getBoundingClientRect().right + 1);
		});
	});
});
