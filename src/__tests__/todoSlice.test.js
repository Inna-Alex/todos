import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import todoSlice, { initialState, addTodo } from "../slices/todoSlice";
import * as Consts from '../utils/consts'

describe("tests for todoSlice", () => {
  test("initialize slice with initialValue", () => {
    const listSliceInit = todoSlice(initialState, { type: "unknown" });
    expect(listSliceInit).toBe(initialState);
    expect(listSliceInit).toStrictEqual({ 'filterStatus': 'all', 'todoList': [] });
  });

  test("test addTodo reducer", () => {
    const testData = {
      id: uuid(),
      title: 'test',
      status: Consts.Incomplete,
      time: format(new Date(), Consts.DateFormat),
    };

    const afterReducerOperation = todoSlice(
      initialState,
      addTodo(testData)
    );

    expect(afterReducerOperation).toStrictEqual({
      'filterStatus': 'all',
      'todoList': [testData],
    });
  });
});