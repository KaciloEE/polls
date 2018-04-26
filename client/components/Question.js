import React from 'react';
import {Row, Card, CardTitle, Button, CardColumns, Badge} from 'reactstrap';
import ReactChartkick, {PieChart} from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

const Question = (props) => {
  const {data, user, errors} = props
  return (
    <Row>
      <CardColumns>
        {!data ? '' :
          data.map(item => {
            return (
              <Card body key={item.id}>
                <CardTitle>{item.title}</CardTitle>
                <div>
                  <small>Author: {item.authorName}</small>
                </div>
                <div>
                  <small>Date: {new Date(item.date).toLocaleTimeString()}</small>
                </div>
                <div>
                  <small>Votes:</small>
                  <Badge pill>{item.pollTotal}</Badge>
                </div>
                <div>
                  <small>Tags:</small>
                  {!item.tags.length ? '' :
                    item.tags.map((tags, idx) => <small className="react-tagsinput-tag" key={idx}>{tags}{' '}</small>)
                  }
                </div>
                <br/>
                {!item.pollTotal ? '' :
                  <PieChart width="100%" height="150px"
                            data={[["Yes", item.option[0].votes], ["No", item.option[1].votes]]}/>
                }
                {item.answer.indexOf(user.id) !== -1 || item.author === user.id ?
                  ''
                  :
                  item.option.map(i => {
                    return (
                      <Button outline color="primary"
                              onClick={props.onVote.bind(this, item.id, i.id)}
                              key={i.id}>{i.name}</Button>)
                  })}
                <div className="errors">
                  {errors.map(error => <div key={error}>{error}</div>)}
                </div>
              </Card>
            )
          })
        }
      </CardColumns>
    </Row>
  );
}

export default Question;