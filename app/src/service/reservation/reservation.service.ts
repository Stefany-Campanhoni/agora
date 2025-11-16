import { getAllReservations } from "./reservation.api"
import type { SimpleReservation } from "./reservation.types"

export const OPENING_TIME = "08:00"
export const CLOSING_TIME = "22:00"

export async function getAllReservationsDateTime() {
  const reservations = await getAllReservations()

  if (!reservations || reservations.length === 0) {
    return {
      allStartDateTime: new Map<string, string[]>(),
      allEndDateTime: new Map<string, string[]>(),
    }
  }

  const allStartDateTime = new Map<string, string[]>()
  const allEndDateTime = new Map<string, string[]>()

  reservations.forEach((reservation) => {
    const startDate = extractDate(reservation.startDateTime)
    const startTime = extractTime(reservation.startDateTime)

    if (!allStartDateTime.has(startDate)) {
      allStartDateTime.set(startDate, [startTime])
    } else {
      allStartDateTime.get(startDate)!.push(startTime)
    }

    const endDate = extractDate(reservation.endDateTime)
    const endTime = extractTime(reservation.endDateTime)

    if (!allEndDateTime.has(endDate)) {
      allEndDateTime.set(endDate, [endTime])
    } else {
      allEndDateTime.get(endDate)!.push(endTime)
    }
  })

  return { allStartDateTime, allEndDateTime }
}

export function getDisabledDates(
  allStartDateTime: Map<string, string[]>,
  allEndDateTime: Map<string, string[]>,
): string[] {
  const allDateTime = new Map<string, SimpleReservation[]>()
  allStartDateTime.forEach((startTimes, date) => {
    const endTimes = allEndDateTime.get(date) || []
    if (endTimes.length === 0) return

    const reservations: SimpleReservation[] = startTimes.map((startTime, index) => ({
      startDateTime: `${date}T${startTime}`,
      endDateTime: `${date}T${endTimes[index]}`,
    }))
    allDateTime.set(date, reservations)
  })

  const disabledDates: string[] = []
  allDateTime.forEach((reservations, date) => {
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
    const startTime = extractTime(reservations[0].startDateTime)
    const endTime = extractTime(reservations[0].endDateTime)
    return startTime === OPENING_TIME && endTime === CLOSING_TIME
  }

  let acc = 0
  reservations.forEach((reservation, index) => {
    const startTime = extractTime(reservation.startDateTime)
    const endTime = extractTime(reservation.endDateTime)

    if (index === 0) {
      acc += startTime === OPENING_TIME ? 1 : 0
    } else if (index === reservations.length - 1) {
      acc += endTime === CLOSING_TIME ? 1 : 0
    } else {
      const lastReservationEndTime = extractTime(reservations[index - 1].endDateTime)
      acc += lastReservationEndTime === startTime ? 1 : 0
    }
  })
  return acc === reservations.length
}

export function getDisabledTimes(allReservations: SimpleReservation[]): string[] {
  return allReservations.map((reservation) => extractTime(reservation.startDateTime))
}

function extractDate(dateTime: string): string {
  return dateTime.split("T")[0]
}

function extractTime(dateTime: string): string {
  return dateTime.split("T")[1]
}
