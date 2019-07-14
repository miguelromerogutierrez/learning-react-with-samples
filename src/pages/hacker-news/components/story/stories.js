import React from 'react'
import PropTypes from 'prop-types'
import Paginator from '../Paginator';
import StoriesData from '../StoriesData';
import Story from '../story/story';
import Spinner from '../../../shared_component/spinner/spinner';

function Stories(props) {
  return (
    <Paginator
          data={props.stories}
          itemsPerPage={15}
        >
          {({
            itemsPage
          }) =>
            itemsPage.length > 0 &&
            <StoriesData storiesId={itemsPage}>
              {({
                stories,
                pending
              }) =>
                pending
                ? <Spinner />
                : (
                  <div className="story--container">
                    {
                      stories.map(
                        story => <Story {...story} />
                        )
                    }
                  </div>
                )
              }
            </StoriesData>
          }
        </Paginator>
  )
}

Stories.propTypes = {

}

export default Stories

