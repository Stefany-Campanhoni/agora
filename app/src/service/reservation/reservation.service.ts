import type { SimpleReservation } from "./reservation.types"

export const OPENING_TIME = "08:00"
export const CLOSING_TIME = "22:00"

export function getDisabledDates(allReservations: SimpleReservation[]): string[] {
  if (!allReservations || allReservations.length === 0) {
    return []
  }

  const allDates = new Map<string, SimpleReservation[]>()

  allReservations.forEach((reservation) => {
    const date = extractDate(reservation.startTime)
    if (!allDates.has(date)) {
      allDates.set(date, [reservation])
    }
    allDates.get(date)!.push(reservation)
  })

  const disabledDates: string[] = []
  allDates.forEach((reservations, date) => {
    if (checkIfDateIsDisabled(reservations)) {
      disabledDates.push(date)
    }
  })

  return disabledDates
}

function checkIfDateIsDisabled(reservations: SimpleReservation[]): boolean {
  if (reservations.length === 0) {
    return false
  }
  if (reservations.length === 1) {
    const startTime = extractTime(reservations[0].startTime)
    const endTime = extractTime(reservations[0].endTime)
    return startTime === OPENING_TIME && endTime === CLOSING_TIME
  }

  let acc = 0
  reservations.forEach((reservation, index) => {
    const startTime = extractTime(reservation.startTime)
    const endTime = extractTime(reservation.endTime)

    if (index === 0) {
      acc += startTime === OPENING_TIME ? 1 : 0
    } else if (index === reservations.length - 1) {
      acc += endTime === CLOSING_TIME ? 1 : 0
    } else {
      const lastReservationEndTime = extractTime(reservations[index - 1].endTime)
      acc += lastReservationEndTime === startTime ? 1 : 0
    }
  })
  return acc === reservations.length
}

export function getDisabledTimes(allReservations: SimpleReservation[]): string[] {
  return allReservations.map((reservation) => extractTime(reservation.startTime))
}

function extractDate(dateTime: string): string {
  return dateTime.split("T")[0]
}

function extractTime(dateTime: string): string {
  return dateTime.split("T")[1]
}
