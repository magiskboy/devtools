import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SettingForm } from './setting-form';
import { supportedDialects } from 'sql-formatter';


test('SettingForm', () => {
  const { container } = render(
    <SettingForm>
        <form className="is-flex is-flex-direction-column">
          <div className="field">
            <label className="label">Language</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="language" value='mysql' defaultValue='mysql'>
                  {supportedDialects.map((dialect) => (
                    <option key={dialect} value={dialect}>
                      {dialect}
                    </option>))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Tab width</label>
            <div className="control">
              <input type="number" defaultValue={2} value={2} className="input" name="tabWidth" />
            </div>
          </div>

          <div className="field">
            <label className="label">Keyword case</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="keywordCase" value='upper' defaultValue='upper'>
                  <option value="upper">Upper</option>
                  <option value="lower">Lower</option>
                  <option value="preserve">Unchanged</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Function case</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="functionCase" id="functionCase" value='upper' defaultValue='upper'>
                  <option value="upper">Upper</option>
                  <option value="lower">Lower</option>
                  <option value="preserve">Unchanged</option>
                </select>
              </div>
            </div>
          </div>

          <div className="control">
            <button className="button is-primary is-fullwidth">Format</button>
          </div>
        </form>

    </SettingForm>
  );
  expect(container).toMatchSnapshot();
});
