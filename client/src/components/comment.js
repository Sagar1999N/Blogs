import moment from 'moment'

const styles = {
  title: {
    fontSize: '1.3em',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'darkgray',
  },
  detailsContainer: {
    marginTop: '10px',
    marginBottom: '10px',
  },
}

const Comment = (props) => {
  const { comment } = props
  return (
    <div>
      <div className="row">
        <div className="col">
          <div style={styles.subtitle}>
            Created By {comment.firstName} on{' '}
            {moment(comment.createdTimestamp).format('MMM DD, YYYY')} (
            {moment(comment.createdTimestamp).fromNow()})
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div style={styles.detailsContainer}>{comment.comment}</div>
        </div>
      </div>

      <hr />
    </div>
  )
}

export default Comment
